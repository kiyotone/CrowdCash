import '@/styles/globals.css'
import {store} from '../components/redux/store'
import { Provider } from "react-redux";
import Topbar from '@/components/topbar/Topbar';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter()
  console.log()
  return(
  <Provider store={store}>
  { !router.pathname.includes('/auth') && <Topbar /> }
  <Component {...pageProps} />

</Provider>
  )
}

