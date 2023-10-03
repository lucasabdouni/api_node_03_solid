import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let checkInsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(checkInsRepository)
  })

  it('should be able to fetch search for gyms', async () => {
    await checkInsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.4988348,
      longitude: -44.1087976,
    })

    await checkInsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.4096624,
      longitude: -48.1313283,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.4907461,
      userLongitude: -44.1020814,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  it.skip('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        title: `Typescript Gym${1}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ gym_id: 'Typescript Gym21' }),
      expect.objectContaining({ gym_id: 'Typescript Gym22' }),
    ])
  })
})
