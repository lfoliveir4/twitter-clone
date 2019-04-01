import { getInitialData } from '../utils/api';
import { recieveUsers } from '../actions/users'
import { recieveTweets } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'
 

const AUTHED_ID = 'tylermcginnis'


export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, tweets }) => {
       dispatch(recieveUsers(users))
       dispatch(recieveTweets(tweets))
       dispatch(setAuthedUser(AUTHED_ID))


      })
  }
}
