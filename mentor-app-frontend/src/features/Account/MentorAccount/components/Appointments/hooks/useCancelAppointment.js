import { gql } from "graphql-request";

const useCancelAppointment = (
  graphQLClient,
  appointmentId,
  allAppointments,
  setAllAppointments
) => {
  const mutation = gql`
    mutation cancelAppointment($appointment_id: ID!) {
      cancel_appointment(appointment_id: $appointment_id) {
        result
      }
    }
  `;

  const cancelAppointment = async () => {
    if (!appointmentId) {
      return;
    }

    const variables = {
      appointment_id: appointmentId,
    };

    await graphQLClient.request(mutation, variables);

    let _allAppointments = allAppointments;
    _allAppointments = _allAppointments.filter(
      (appointment) => appointment.appointmentId !== appointmentId
    );

    setAllAppointments(_allAppointments);
  };

  return cancelAppointment;
};

export default useCancelAppointment;
