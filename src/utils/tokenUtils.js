import axios from "axios";

export default function verify(token) {
    axios.get('/api/token/verify?token=' + token)
        .then(resp => {
        if (resp.data.code === 'K-000001') {
            return null
        }
        return resp.data.context
    }).catch(err =>{
        return null
    })
}
