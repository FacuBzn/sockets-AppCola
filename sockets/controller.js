const TickeControl = require('../models/ticket-control');


const ticketControl = new TickeControl(); // Esta es una instancia que va a ser unica, cada vez que se reinicializa su backend


const socketController = (socket) => { // Controlador que va a manejar toda la informacion de Sockets    
    /*socket.on('disconnect', () => {}); */

    // Cuando un cliente se conecta
    socket.emit( 'ultimo-ticket', ticketControl.ultimo ); //emitir un mensaje solo a la persona que se esta conectando
    socket.emit( 'estado-actual', ticketControl.ultimos4 ); //cuando el socket se conecte emito el "estado-actual"
    socket.emit('tickets-pendientes', ticketControl.tickets.length); 

    socket.on('siguiente-ticket', ( payload, callback ) => { // 'enviar-mensaje' es el nombre que se le da al evento 
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente ); //El callback manda un objeto String que es el ticket.numero
        
        //todo:notificar que hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    socket.on('atender-ticket', ( {escritorio} , callback ) => { // 'atender-ticket' es el nombre que se le da al evento 
        /* console.log(payload); */
        /* console.log(payload.escritorio); */

        if ( !escritorio ) { // si el escritorio no viene devolver el sgte objeto por si no lo trae.
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        //cual es el ticket que debo atender
        const ticket = ticketControl.atenderTicket( escritorio );

        //todo: Notificar cambio en los ultimos 4
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );

        socket.emit('tickets-pendientes', ticketControl.tickets.length); //
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length); // Emita a todos menos al cliente emitido        
        
        if ( !ticket ) { // si ticket no existiera voy a llamar al callback
            callback({
                ok: false, // no se hizo correctamente
                msg: 'Ya no hay tickets pendientes'
            });
        } 
        else {
            callback({
                ok:true,
                ticket // El ticket que tenemos asignado aca
            })
        }




    });

    



}



module.exports = {
    socketController
}

