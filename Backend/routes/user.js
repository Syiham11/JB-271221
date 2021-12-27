const { UsersService } = require('../services')
module.exports = [
    
    {
        method: 'POST',
        path: '/login',
        handler: (request, handler) => {
            return UsersService.login(request.payload)
        }
        
    },
   
]