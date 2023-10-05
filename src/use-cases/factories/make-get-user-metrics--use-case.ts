import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepositoryu } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepositoryu()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
