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
    const deleteAppointment = await Citas.destroy({
      where: { id: appointmentId, client_id: req.clientId },
    });
    return res.json({
      success: true,
      message: "Appointment deleted",
      data: deleteAppointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

// ACTUALIZAR CITA COMO PACIENTE
appointmentController.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const date = req.body.date;
    const hour = req.body.hour;
    const price = req.body.price;
    const about = req.body.about;
    const updateAppointment = await Citas.update(
      { date: date, hour: hour, price: price, about: about },
      { where: { id: appointmentId, client_id: req.clientId } }
    );
    return res.json({
      success: true,
      message: "Appointment updated",
      data: updateAppointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};
module.exports = appointmentController;
