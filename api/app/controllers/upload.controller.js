const path = require('path');
const fs = require('fs');

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

const uploadCouverture = (req, res) => {
    try {
        if (req.files === null) {
            return res.status(400).json({ message: 'Aucune couverture n\'a été trouvée.' });
        }
        console.log(Object.keys(req));
        const file = req.files.file;
        const fileName = req.body.fileName;
        console.log(fileName);
        const fileDir = path.join(uploadDir, fileName);
        file.mv(fileDir, err => {
            if (err) {
                console.error(err);
                return res.status(500).send({message: "Erreur lors de l'upload de la couverture."});
            }
            res.status(200).send({ fileName: file.name, message: "L'upload de la couverture a terminé avec succès" });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur.');
    }
}

const getCouverture = async (req, res) => {

    const name = req.params.name

    if (name) {
        const filePath = path.join(uploadDir, name);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Erreur' })
            } else {
                res.status(200).send(data)
            }
        })
    }
    else {
        res.status(200).send({ message: 'Pas de couverture trouvée' })
    }
}

module.exports = {
    uploadCouverture,
    getCouverture
};