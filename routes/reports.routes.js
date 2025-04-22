const { protect, authorizeRoles } = require('../middleware/auth.middleware');

const router = require('express').Router();

// test to see if the protect and authorizeRoles middlewares are working
router.get('/', protect, authorizeRoles('admin'), (req, res) => {
    res.json({
        message: 'welcome, admin', reports: [
            {
                id: 1,
                title: 'Report 1',
                description: 'Description of report 1',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                title: 'Report 2',
                description: 'Description of report 2',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]
    });
}
);


module.exports = router;
