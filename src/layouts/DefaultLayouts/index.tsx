// import { Outlet } from 'react-router-dom'
import { AppContainer } from '../../components/AppContainer'

export function DefaultLayout({ children}: { children: React.ReactNode}) {
  return (
    <>
      <AppContainer>
        {children}
      </AppContainer>
    </>
  )
}
