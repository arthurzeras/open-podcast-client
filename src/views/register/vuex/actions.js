import services from '@/http'

export const RegisterUser = (context, payload) => (
  services.register.register(payload)
)
