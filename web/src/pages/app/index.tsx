import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"

export default function Main() {

  const { user } = useUser()

  return (
    <div>
      <h1>Educa+</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      {/* <a href="/api/auth/logout">Logout</a> */}
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()