import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store/store'

const useThunkDispatch = () => useDispatch<AppDispatch>()

export default useThunkDispatch
