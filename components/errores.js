
exports.Errores = (status, name, message, CusMess) => {
    let errores;
    return errores = {status: status,
                        name: name,
                        message: message,
                        CusMess: CusMess};
}
