const appointmentController = {};
const { Citas, Centro, Doctores, Usuarios, Pacientes } = require("../models");
const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");

// CREAR CITA COMO PACIENTE
appointmentController.createAppointment = async (req, res) => {
  try {
    const { fecha, horario, id_centro, tratamiento, id_doctor } = req.body;
    const paciente = await Pacientes.findOne({
      where: { id_usuario: req.user_id },
    });
    const newAppointment = await Citas.create({
      id_doctor: id_doctor,
      id_paciente: paciente.id,
      id_centro: id_centro,
      fecha: fecha,
      horario: horario,
      tratamiento: tratamiento,
    });
    const doctorData = await Doctores.findByPk(newAppointment.id_doctor, {
      attributes: {
        exclude: ["id", "id_usuario", "activo", "createdAt", "updatedAt"],
      },
      include: {
        model: Usuarios,
        as: "Doctor",
        attributes: {
          exclude: [
            "id",
            "edad",
            "email",
            "telefono",
            "password",
            "id_rol",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    });
    const newAppointmentData = await Citas.findByPk(newAppointment.id, {
      attributes: {
        exclude: [
          "id",
          "id_paciente",
          "id_doctor",
          "id_centro",
          "createdAt",
          "updatedAt",
        ],
      },
      include: {
        model: Centro,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },
    });
    return sendSuccsessResponse(res, 200, {
      message: "Appointment created",
      newAppointment: newAppointmentData,
      Doctor: doctorData,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Unable to create appointment", error);
  }
};

// BORRAR CITA COMO PACIENTE
appointmentController.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const paciente = await Pacientes.findOne({
      where: { id_usuario: req.user_id },
    });
    const deleteCita = await Citas.destroy({
      where: { id: appointmentId, id_paciente: paciente.id },
    });
    if (deleteCita == 1) {
      return sendSuccsessResponse(res, 200, { message: "Appointment changed" });
    } else {
      return sendErrorResponse(res, 404, "Complete require filds correctly");
    }
  } catch (error) {
    return sendErrorResponse(res, 500, "Unable to delete appointment", error);
  }
};

// ACTUALIZAR CITA COMO PACIENTE
appointmentController.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { fecha, horario, tratamiento, id_centro, id_doctor } = req.body;
    const paciente = await Pacientes.findOne({
      where: { id_usuario: req.user_id },
    });
    const updateCita = await Citas.update(
      {
        fecha: fecha,
        horario: horario,
        tratamiento: tratamiento,
        id_centro: id_centro,
        id_doctor: id_doctor,
      },
      { where: { id: appointmentId, id_paciente: paciente.id } }
    );

    if (updateCita == 1) {
      return sendSuccsessResponse(res, 200, { message: "Appointment changed" });
    } else {
      return sendErrorResponse(res, 404, "Complete require filds correctly");
    }
  } catch (error) {
    return sendErrorResponse(res, 500, "Unable to update appointment", error);
  }
};
module.exports = appointmentController;
