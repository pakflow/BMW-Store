import { useCallback, useMemo } from 'react'
import { container } from 'tsyringe'
import { cartManagerToken } from '../token'

const useCartManager = () => {
  const manager = useMemo(() => {
    return container.resolve(cartManagerToken)
  }, [])

  const getState = useCallback(() => {
    return manager.state
  }, [manager])

  return {
    getState,
    subscribe: manager.subscribe.bind(manager),
    open: manager.open.bind(manager),
    close: manager.close.bind(manager),
  }
}

export default useCartManager
