
const getAllUscite = (req, res) => {
    res.status(200).json({
        status:'success',
        /*results: uscite.length,
        data: {
            uscite: uscite,
        }*/
    });
};
const getUscita = (req, res) => {
    res.status(200).json({
        status: 'success',
        /*data: {
            uscita,
        },*/
    });
};
const createUscita = (req, res) => {
    res.status(201).json({
            status: 'success',
            /*data: {
                uscite: newUscita
            },*/
        });
};
const updateUscita = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: '<Aggiorna utente qui...>',
        },
    });
};
const deleteUscita = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
};

module.exports = { 
    getAllUscite, 
    getUscita, 
    createUscita, 
    updateUscita, 
    deleteUscita 
};