type CartManagerState = {
  isOpen: boolean
}

class CartManager {
  private _subscribers: Array<() => void> = []
  public state = {
    isOpen: false,
  }
  protected setState(newState: Partial<CartManagerState>) {
    this.state = { ...this.state, ...newState }
  }

  open = () => {
    this.setState({
      isOpen: true,
    })
    this.notifySubscribers()
  }

  close = () => {
    this.setState({
      isOpen: false,
    })
    this.notifySubscribers()
  }

  protected notifySubscribers = () => {
    this._subscribers.forEach((cb) => cb())
  }

  public subscribe = (cb: () => void) => {
    this._subscribers.push(cb)

    return () => {
      this._subscribers = this._subscribers.filter((_cb) => _cb !== cb)
    }
  }
}

export default CartManager
