const TickeControl = require('../models/ticket-control');


const ticketControl = new TickeControl(); // Esta es una instancia que va a ser unica, cada vez que se reinicializa su backend


const socketController = (socket) => { // Controlador que va a manejar toda la informacion de Sockets
    
    /*socket.on('disconnect', () => {}); */

    socket.on('enviar-mensaje', ( payload, callback ) => {
        
        const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );

    })

}



module.exports = {
    socketController
}

