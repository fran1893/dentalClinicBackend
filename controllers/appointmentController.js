const appointmentController = {};
const { Citas, Centro, Doctores, Usuarios } = require("../models");
const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");

// CREAR CITA COMO PACIENTE
appointmentController.createAppointment = async (req, res) => {
  try {
    const { fecha, horario, id_centro, tratamiento, id_doctor } = req.body;
    const newAppointment = await Citas.create({
      id_doctor: id_doctor,
      id_paciente: req.user_id,
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
    return sendSuccsessResponse(res, 200, [
      { message: "Appointment created" },
      newAppointmentData,
      doctorData,
    ]);
  } catch (error) {
    return sendErrorResponse(res, 500, "Unable to create appointment", error);
  }
};

// BORRAR CITA COMO PACIENTE
appointmentController.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await Citas.destroy({
      where: { id: appointmentId, id_paciente: req.user_id },
    });
    return sendSuccsessResponse(res, 200, [{ message: "Appointment deleted" }]);
  } catch (error) {
    return sendErrorResponse(res, 500, "Unable to delete appointment", error);
  }
};

// ACTUALIZAR CITA COMO PACIENTE
appointmentController.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { fecha, horario, tratamiento, id_centro, id_doctor } = req.body;
    await Citas.update(
      {
        fecha: fecha,
        horario: horario,
        tratamiento: tratamiento,
        id_centro: id_centro,
        id_doctor: id_doctor,
      },
      { where: { id: appointmentId, id_paciente: req.user_id } }
    );
    return sendSuccsessResponse(res, 200, [{ message: "Appointment changed" }]);
  } catch (error) {
    return sendErrorResponse(res, 500, "Unable to update appointment", error);
  }
};
module.exports = appointmentController;
