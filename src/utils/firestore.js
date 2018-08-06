import fire from './firebase'

const settings = {timestampsInSnapshots: true}
const firestore = fire.firestore()
firestore.settings(settings)

export default firestore