export const base44 = {
  auth: {
    loginViaEmailPassword: async () => {},
    loginWithProvider: async () => {},
    logout: () => {},
    redirectToLogin: () => {},
    register: async () => {},
    verifyOtp: async () => {},
    resetPasswordRequest: async () => {},
    resetPassword: async () => {},
    me: async () => null,
  },
  entities: {
    SiteContent: {
      list: async () => [],
      filter: async () => [],
      update: async () => {},
      create: async () => {},
    },
  },
  functions: {
    invoke: async () => ({ data: {} }),
  },
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: '' }),
    },
  },
};
