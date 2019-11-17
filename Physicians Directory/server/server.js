const express = require('express');
const app = express();
const allPhysicians = require('./db/physicians.js');
const allAppointments = require('./db/appointments.js');

const bodyParser = require('body-parser');

const appointmentsForPhysician = (physicianId) => {
    return allAppointments.filter((appointment) => ( appointment.physicianId === physicianId ));
};

const deleteAppointment = (appointmentId) => {
    for(let i = 0; i < allAppointments.length; i++){
      if (allAppointments[i].id === appointmentId){
        return allAppointments.splice(i, 1);
      }
    }
};

const createNewAppointmentForPhysicianId = (physicianId, details) => {
    let name = details.name.split(" ");

  const newAppointment = {
    id: parseInt(allAppointments[allAppointments.length - 1].id) + 1,
    time: details.time,
    physicianId: physicianId,
    patientFirstName: name[0],
    patientLastName: name[1],
    kind: details.kind,
  };
    allAppointments.push(newAppointment);

    return newAppointment;
};

// deleteAppointment("1");
// allAppointments.splice(0, 1);
console.log(allAppointments);

//this allows the server to serve the entire directory up to the client as static files eg. assets
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/physicians", (req, res) => {
	res.send(allPhysicians);
});

app.get("/api/appointments/:physicianId", (req, res) => {
    res.send(appointmentsForPhysician(req.params.physicianId));
});

app.post("/api/appointments/:appointmentId/delete", (req, res) => {
    // console.log("req", req);
  console.log("req", req.params.appointmentId);
    res.send(deleteAppointment(req.params.appointmentId));
});

app.post("/api/appointments/:physicianId/new", (req, res) => {
    console.log("new appointment", req.params.physicianId, req.body);
    res.send(createNewAppointmentForPhysicianId(req.params.physicianId, req.body));
});

app.listen(8142, () => console.log("Listening on port 8142"));
