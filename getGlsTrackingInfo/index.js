const request = require('xhr-request');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getGlsTrackingInfo = (req, res) => {
    const address = `https://gls-group.eu/app/service/open/rest/PL/pl/rstt001?match=${req.query.tracking}`;
    if(!req.query.tracking){
        res.status(400).send({error: "tracking number required!"})
    }
    request(address, {
        json: true
    }, function (err, data) {
        if (err) {
            res.status(500).send({error: err})
        }
        if(data.tuStatus){
            const history = data.tuStatus[0].history;
            let statuses = [];
            for (let status of history) {
                statuses.push({
                    status: status.evtDscr,
                    status_description: status.evtDscr,
                    datetime: status.date + 'T' + status.time,
                    place: status.address.city
                })
            }

            res.status(200).send(
                {
                    tracking_number: req.query.tracking,
                    status: history[0].evtDscr,
                    status_description: history[0].evtDscr,
                    updated_at: history[0].date + 'T' + history[0].time,
                    tracking_details: statuses
                });
        }
        else{
            res.status(404).send({error: `Order with tracking number ${req.query.tracking} not found`})
        }
    });
};