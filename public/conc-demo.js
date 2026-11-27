(() => {
  const storageKey = 'concDemoState';
  const sessionToken = 'conc-demo-member';
  const sampleMember = {
    fullName: 'Demo Participant',
    email: 'demo@example.com',
    phone: '0800000000',
    hasPassword: true,
  };
  const date = '2026-08-15T09:00:00Z';
  const sampleProgram = { title: 'Executive Communication Design for Digital Teams', fee: 'THB 4,900 (demo)' };
  const sampleCertificate = {
    code: 'DEMO-CERT',
    recipientName: sampleMember.fullName,
    program: sampleProgram,
    completedAt: date,
    issuedAt: date,
  };
  const sampleRegistration = {
    id: 'sample',
    program: sampleProgram,
    submittedAt: date,
    status: 'confirmed',
    certificate: { ...sampleCertificate, visible: true },
    payment: { status: 'pending', amountLabel: sampleProgram.fee },
  };

  const ok = (data) => Response.json({ data });
  const error = (message, status) => Response.json({ error: { message } }, { status });

  function readState() {
    const stored = sessionStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : { member: sampleMember, registrations: [sampleRegistration] };
  }

  function saveState(state) {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }

  window.concDemoFetch = async (url, options = {}) => {
    const path = new URL(url, location.origin).pathname.replace(/^\/__conc-demo\/api/, '');
    const payload = typeof options.body === 'string' ? (JSON.parse(options.body).data ?? {}) : {};
    const state = readState();
    const authenticated = new Headers(options.headers).get('Authorization') === `Bearer ${sessionToken}`;
    const member = state.member;

    switch (path) {
      case '/announcement-popup/active':
        return ok(null);
      case '/member-accounts/login-public':
      case '/member-accounts/activate-public':
        return ok({ token: sessionToken });
      case '/member-accounts/request-password-reset-public':
        return ok({ sent: true, resetPath: '/member-forgot-password?token=demo-reset' });
      case '/member-accounts/reset-password-public':
        return payload.token === 'demo-reset'
          ? ok({ token: sessionToken })
          : error('Use the demo reset link to continue.', 400);
      case '/member-accounts/me-public':
        return authenticated ? ok(state) : error('Open the demo account to continue.', 401);
      case '/member-accounts/profile-public':
        if (!authenticated) return error('Open the demo account to continue.', 401);
        state.member = { ...member, fullName: payload.fullName, phone: payload.phone };
        saveState(state);
        return ok({ member: state.member });
      case '/member-accounts/change-password-public':
        return authenticated ? ok({ member }) : error('Open the demo account to continue.', 401);
      case '/program-registrations/public': {
        const id = crypto.randomUUID();
        const program = { title: payload.programTitle || 'Demo program', slug: payload.programSlug };
        state.registrations.unshift({
          id,
          program,
          registrationKind: payload.registrationKind,
          submittedAt: new Date().toISOString(),
          status: 'pending',
          payment: { status: 'pending', amountLabel: 'Sample fee' },
        });
        saveState(state);
        return ok({ id, memberAuth: { token: sessionToken } });
      }
      case '/customized-training-requests/public':
      case '/teaching-applications/public':
        return ok({ id: 'demo' });
      case '/program-registrations/certificates/DEMO-CERT':
        return ok(sampleCertificate);
    }

    const paymentRoute = path.match(/^\/member-payments\/by-registration-public\/([^/]+)(?:\/(upload-slip|submit))?$/);
    if (!paymentRoute) return error('This sample record is unavailable.', 404);
    if (!authenticated) return error('Open the demo account to continue.', 401);

    const [, registrationId, action] = paymentRoute;
    const registration = state.registrations.find(({ id }) => id === registrationId);
    if (!registration) return error('Demo registration not found.', 404);
    if (action === 'upload-slip') return ok({});

    if (action === 'submit' && registration.payment.status !== 'paid') {
      const issuedAt = new Date().toISOString();
      registration.payment = {
        ...registration.payment,
        status: 'paid',
        submittedAt: issuedAt,
        confirmedAt: issuedAt,
        receipt: {
          visible: true,
          receiptNumber: `DEMO-${registrationId.slice(0, 8).toUpperCase()}`,
          issuedAt,
          payerName: sampleMember.fullName,
          program: registration.program,
          amountLabel: registration.payment.amountLabel,
          paymentMethod: payload.paymentMethod,
        },
      };
      saveState(state);
    }
    return ok({ registration, payment: registration.payment, member });
  };
})();
