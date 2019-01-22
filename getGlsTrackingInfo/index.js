const request = require('xhr-request');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getGlsTrackingInfo = (req, res) => {
    const address = `https://gls-group.eu/app/service/open/rest/PL/pl/rstt001?match=${req.query.tracking}`;
    let message = req.query.message || req.body.message || 'Hello World!';
    request(address, {
        json: true
    }, function (err, data) {
        if (err) throw err;
        console.log(data);
    });
    res.status(200).send(message);
};
