import { gql } from "graphql-request";

const useFinishAppointment = (
  graphQLClient,
  appointmentId,
  allAppointments,
  setAllAppointments
) => {
  const mutation = gql`
    mutation finishAppointment($appointment_id: ID!) {
      mentor_finish_appointment(appointment_id: $appointment_id) {
        result
      }
    }
  `;

  const finishAppointment = async () => {
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

  return finishAppointment;
};

export default useFinishAppointment;
