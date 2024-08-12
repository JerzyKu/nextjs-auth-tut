import { auth } from '@/auth'

type Props = {}

const SettingsPage = async (props: Props) => {

    const session = auth()
  return (
    <div>
        SettingsPage
        <hr />
        {JSON.stringify(session)}
    </div>
  )
}

export default SettingsPage