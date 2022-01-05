import { gql } from "graphql-request";

const useAcceptAppointment = (
  graphQLClient,
  appointmentId,
  allAppointments,
  setAllAppointments
) => {
  const mutation = gql`
    mutation acceptAppointment($appointment_id: ID!) {
      mentor_accept_appointment(appointment_id: $appointment_id) {
        result
      }
    }
  `;

  const acceptAppointment = async () => {
    if (!appointmentId) {
      return;
    }

    const variables = {
      appointment_id: appointmentId,
    };

    await graphQLClient.request(mutation, variables);

    const index = allAppointments.findIndex(appointment => appointment.appointmentId === appointmentId);

    let item = allAppointments[index];

    let _allAppointments = allAppointments;
    _allAppointments = _allAppointments.filter(
      (appointment) => appointment.appointmentId !== appointmentId
    );

    _allAppointments.push({
        ...item,
        status: 'ACCEPTED'
    })

    setAllAppointments(_allAppointments);
  };

  return acceptAppointment;
};

export default useAcceptAppointment;
