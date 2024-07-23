const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    tieuDe: String,
    moTa: String,
    loaiThuChi: String,
    soTien: Number,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', TodoSchema);
