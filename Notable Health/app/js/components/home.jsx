import React, { Component } from "react";
import axios from "axios";

const styles = {
    container: {
        display: "flex",
    },
    logo: {
      color: "blue",
    },
    physicianList: {
        fontWeight: "bold",
    },
    leftCol: {
        flex: "1"
    },
    rightCol: {
        flex: "3"
    },
    selectedPhysician: {
      background: "blue",
      color: "white"
    },
    headerRow: {
        background: "blue",
        color: "white",
    },
    cell: {
        width: "150px",
        textAlign: "center"
    }
};

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            physicians: [],
            appointments: [],
            selectedPhysician: {},
            newAppointmentName: "",
            newAppointmentTime: "",
            newAppointmentKind: ""
        };
        this.createSelectPhysician = this.createSelectPhysician.bind(this);
        this.createRemoveAppointment = this.createRemoveAppointment.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.updateKind = this.updateKind.bind(this);
        this.createAppointment = this.createAppointment.bind(this);
    }

    componentDidMount() {
        axios.get("/api/physicians").then((response) => {
           this.setState({ physicians: response.data });
        });
    }

    createSelectPhysician(physician) {
        return () => {
            axios.get(`/api/appointments/${physician.id}`).then((response) => {
                this.setState({
                    appointments: response.data,
                    selectedPhysician: physician,
                });
            });
        };
    }

    createDoctorName() {
        return this.state.selectedPhysician.firstName ? ` Dr. ${this.state.selectedPhysician.firstName} ${this.state.selectedPhysician.lastName}` : ""
    }

    removeAppointment(id) {
      return () => {
        axios.post(`/api/appointments/${id}/delete`).then((response) => {
          let currentAppointments = this.state.appointments.slice();

          currentAppointments = currentAppointments.filter((appointment) => {
            return appointment.id !== id;
          });


          this.setState({
            appointments: currentAppointments
          });
        })
      }
    }

    createRemoveAppointment(id) {
      return this.removeAppointment(id)
    }

    updateName(event){
      this.setState({
        newAppointmentName: event.target.value
      })
    }

    //prettier
    updateTime(event){
      this.setState({
        newAppointmentTime: event.target.value
      })
    }

    updateKind(event){
      this.setState({
        newAppointmentKind: event.target.value
      })
    }

    createAppointment(){
      axios.post(`/api/appointments/${this.state.selectedPhysician.id}/new`,    {
        name: this.state.newAppointmentName,
        time: this.state.newAppointmentTime,
        kind: this.state.newAppointmentKind,
      }).then((response) => {
        console.log("response", response.data);
        let currentAppointments = this.state.appointments.slice();
        currentAppointments.push(response.data);

        this.setState({
          appointments: currentAppointments
        });
      });
    }

    render() {
        return (
            <div style={ styles.container }>
                <div style={ styles.leftCol}>
                    <h1 style={ styles.logo }>notable</h1>
                    <h4 style={ styles.physicianList }> PHYSICIANS </h4>
                    { this.state.physicians.map( (physician) => (
                        <div
                            key={ physician.id }
                            onClick={ this.createSelectPhysician(physician) }
                            style={ this.state.selectedPhysician.id === physician.id ? styles.selectedPhysician : {} }
                        >
                            { physician.lastName }, { physician.firstName }
                        </div>
                    ) ) }
                </div>
                <div style={ styles.rightCol }>
                    <h2> { this.createDoctorName() } </h2>
                    <p> { this.state.selectedPhysician.email } </p>
                    <table>
                      <thead>
                        <tr style={ styles.headerRow }>
                          <th style={ styles.cell }> # </th>
                          <th style={ styles.cell }> Name </th>
                          <th style={ styles.cell }> Time </th>
                          <th style={ styles.cell }> Kind </th>
                          <th style={ styles.cell }> Create/Remove </th>
                        </tr>
                      </thead>
                      <tbody>
                        { this.state.appointments.map( (appointment) => (
                          <tr key={ appointment.id }>
                            <td style={ styles.cell } > { appointment.id } </td>
                            <td style={ styles.cell }> { appointment.patientFirstName } { appointment.patientLastName } </td>
                            <td style={ styles.cell }> { appointment.time } </td>
                            <td style={ styles.cell }> { appointment.kind } </td>
                            <td style={ styles.cell }> <button onClick={this.createRemoveAppointment(appointment.id)}> Remove </button> </td>
                          </tr>
                        ))}

                        <tr>
                          <td>
                          </td>
                          <td>
                            <input
                              type="text"
                              onChange={this.updateName}
                              value={this.state.newAppointmentName}
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              onChange={this.updateTime}
                              value={this.state.newAppointmentTime}
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              onChange={this.updateKind}
                              value={this.state.newAppointmentKind}
                            ></input>
                          </td>
                          <td>
                            <button
                              onClick={ this.createAppointment }
                            >
                              Create
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
        );
    }
}