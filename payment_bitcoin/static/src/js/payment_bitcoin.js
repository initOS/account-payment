$(document).ready(function () {

    // When choosing a delivery carrier, update the quotation and the acquirers
    var $payment_method = $("#payment_method");
    $payment_method.find("input[name='acquirer']").click(function (ev) {
        var $method_id = $(ev.currentTarget).val();
        var $method_name = $(ev.currentTarget).parent('label').find('span').text()


        $('tr[id="payment_bitcoin"]').remove()
        if ($method_name=='Bitcoin')
        {
            var $order_id = $('span[data-oe-model="sale.order"][data-oe-field="amount_total"]').attr('data-oe-id');
            var $order_ref = $('input[name="reference"]').attr('value');

            openerp.jsonRpc("/payment_bitcoin/rate", 'call', {'order_id': $order_id, 'order_ref': $order_ref})
            .then(function (data) {
                if (data[0] === false)
                {
                    alert("Can not use Bitcoin Payment Method for now, \n" + data[1]);
                    $(ev.currentTarget).attr('disabled', 'disabled');
                    $(ev.currentTarget).prop('checked', false);
                }
                else
                {
                    var html = '<tr width="100" id="payment_bitcoin">';
                    html += '<th class="text-right" colspan="2"><h4><span style="white-space: nowrap;"><span class="oe_currency_value">='+ data[1] +'</span>&nbsp;mBTC</span></h4></th></tr>';
                    var row = $('tr[id="order_total"]');
                        $(html).insertAfter(row);
                }
            });
        }
    });
});
