import { FetchUserCheckInsUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepositoryu } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepositoryu()
  const useCase = new FetchUserCheckInsUseCase(checkInsRepository)

  return useCase
}
