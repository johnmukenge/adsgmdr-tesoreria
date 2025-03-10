const Cassa = require('./../models/cassaModel');

const aliasTopCasse = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-importo';
    req.query.fields = 'nome,tipoPagamento,importo';
    next();
}

const getAllCasse = async (req, res) => {
    console.log(req.requestTime);
    try {
        console.log(req.query);
        // Build the query
        // 1.A Filtering
        const queryObj = { ...req.query };
            // Fields to exclude from the queryObj
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
            // remove the fields from the queryObj
        excludeFields.forEach(el => delete queryObj[el]);

        // 1.B Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));
        
        // exact query: { tipoTesoreria: 'centrale', importo: { $gte: 1000 } }
        // coming from api { tipoTesoreria: 'centrale', percentuale: { gte: '15' } }

        let query = Cassa.find(JSON.parse(queryStr));

        // 2. Sorting
        // descending order: /api/v1/casse?sort=-data
        // ascending order: /api/v1/casse?sort=data
        // multiple sorting: /api/v1/casse?sort=data,importo
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // 3. Fiels limiting
        // /api/v1/casse?fields=nome,tipoPagamento,importo
        if(req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // 4. Pagination
        // /api/v1/casse?page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const numCasse = await Cassa.countDocuments();
            if(skip >= numCasse) throw new Error('This page does not exist');
        }
        // Execute the query
        const casse = await query;

        // Send the response
        res.status(200).json({
            status: 'success',
            results: casse.length,
            data: {
                casse,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        });
    }
};
const getCassa = async (req, res) => {
    try {
        const cassa = await Cassa.findById(req.params.id);
        // Cassa.findOne({ _id: req.params.id })
        res.status(200).json({
            status: 'success',
            data: {
                cassa,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};
const createCassa = async (req, res) => {
    try {
        const newCassa = await Cassa.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                cassa: newCassa,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data received',
        });
    }
};
const updateCassa = async (req, res) => {
    try {
        const cassa = await Cassa
            .findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
        res.status(200).json({
            status: 'success',
            data: {
                cassa,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
    
};
const deleteCassa = async (req, res) => {
    try {
        await Cassa.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};

module.exports = {
    getAllCasse,
    getCassa,
    createCassa,
    updateCassa,
    deleteCassa,
    aliasTopCasse,
};