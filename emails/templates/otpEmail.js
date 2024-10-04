module.exports = function (otp, name) {
	return `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        .gmail-mobile-forced-width {
        display: none;
        display: none !important;
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .t20,.t6{width:440px!important}.t19{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t20{padding-left:20px!important;padding-bottom:36px!important;padding-right:20px!important}.t6{padding-bottom:32px!important}.t5{line-height:36px!important;font-size:29px!important;letter-spacing:-1.04px!important;mso-text-raise:2px!important}.t57{padding:28px 15px!important;width:450px!important}.t48{padding-bottom:25px!important;width:175px!important}.t46{text-align:center!important}.t23,.t25,.t29,.t31,.t35,.t37,.t41,.t43{display:revert!important}.t27,.t33,.t39,.t45{vertical-align:top!important}.t55{width:220px!important}.t51{width:325px!important}.t12,.t9{width:440px!important}.t12{padding-bottom:26px!important}.t11{line-height:28px!important;mso-text-raise:3px!important}.t9{padding-bottom:20px!important}.t1,.t4{mso-line-height-alt:24px!important;line-height:24px!important}.t2{padding-bottom:2px!important;width:158px!important}.t17{padding:2px 2px 4px 0!important;width:78px!important}.t15{padding-right:8px!important;width:70px!important}.t14{font-size:30px!important;mso-text-raise:-2px!important}
        }
        </style>
        <style type="text/css">@media (max-width: 480px) {[class~="x_t19"]{mso-line-height-alt:0px!important;line-height:0px!important;display:none!important;} [class~="x_t20"]{padding-left:20px!important;padding-bottom:36px!important;padding-right:20px!important;width:440px!important;} [class~="x_t6"]{padding-bottom:32px!important;width:440px!important;} [class~="x_t5"]{line-height:36px!important;font-size:29px!important;letter-spacing:-1.04px!important;mso-text-raise:2px!important;} [class~="x_t57"]{padding-left:15px!important;padding-top:28px!important;padding-bottom:28px!important;padding-right:15px!important;width:450px!important;} [class~="x_t48"]{padding-bottom:25px!important;width:175px!important;} [class~="x_t46"]{text-align:center!important;} [class~="x_t23"]{display:revert!important;} [class~="x_t25"]{display:revert!important;} [class~="x_t27"]{vertical-align:top!important;} [class~="x_t41"]{display:revert!important;} [class~="x_t43"]{display:revert!important;} [class~="x_t45"]{vertical-align:top!important;} [class~="x_t35"]{display:revert!important;} [class~="x_t37"]{display:revert!important;} [class~="x_t39"]{vertical-align:top!important;} [class~="x_t29"]{display:revert!important;} [class~="x_t31"]{display:revert!important;} [class~="x_t33"]{vertical-align:top!important;} [class~="x_t55"]{width:220px!important;} [class~="x_t51"]{width:325px!important;} [class~="x_t12"]{padding-bottom:26px!important;width:440px!important;} [class~="x_t11"]{line-height:28px!important;mso-text-raise:3px!important;} [class~="x_t9"]{padding-bottom:20px!important;width:440px!important;} [class~="x_t1"]{mso-line-height-alt:24px!important;line-height:24px!important;} [class~="x_t4"]{mso-line-height-alt:24px!important;line-height:24px!important;} [class~="x_t2"]{padding-bottom:2px!important;width:158px!important;} [class~="x_t17"]{padding-left:0px!important;padding-top:2px!important;padding-bottom:4px!important;padding-right:2px!important;width:78px!important;} [class~="x_t15"]{padding-right:8px!important;width:70px!important;} [class~="x_t14"]{font-size:30px!important;mso-text-raise:-2px!important;}}</style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500;700;800&amp;family=Albert+Sans:wght@500;700&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t61" style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;"><div class="t60" style="background-color:#242424;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t59" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#242424;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#242424"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t19" style="mso-line-height-rule:exactly;mso-line-height-alt:45px;line-height:45px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t21" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="737" class="t20" style="background-color:#F8F8F8;padding:0 50px 47px 50px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t20" style="background-color:#F8F8F8;width:637px;padding:0 50px 47px 50px;">
        <!--<![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td><div class="t1" style="mso-line-height-rule:exactly;mso-line-height-alt:34px;line-height:34px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="left">
        <table class="t3" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="209" class="t2">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t2" style="width:209px;">
        <!--<![endif]-->
        <div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="209" height="53.875" alt="" src="https://b8d47ca6-4c3e-4841-aa7f-900bb0bacc9e.b-cdn.net/e/a5b6d418-bd86-4c26-a3ea-c6d28e71d5bf/48fa7412-e255-4a28-8cd5-0f3b1fe2307b.png"/></div></td>
        </tr></table>
        </td></tr><tr><td><div class="t4" style="mso-line-height-rule:exactly;mso-line-height-alt:34px;line-height:34px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t7" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="600" class="t6" style="padding:0 0 30px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t6" style="width:600px;padding:0 0 30px 0;">
        <!--<![endif]-->
        <h1 class="t5" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Verify Your Email Address!</h1></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="600" class="t9" style="padding:0 0 25px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t9" style="width:600px;padding:0 0 25px 0;">
        <!--<![endif]-->
        <p class="t8" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Hello ${name},</p></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t13" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="600" class="t12" style="padding:0 0 25px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t12" style="width:600px;padding:0 0 25px 0;">
        <!--<![endif]-->
        <p class="t11" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Very nice to have you start this business journey on Quicka.<br/><br/>Confirm you email address with the OTP code below and continue to set up your Quicka account. The OTP code expires in 2 mins.</p></td>
        </tr></table>
        </td></tr><tr><td align="left">
        <table class="t18" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="122" class="t17" style="padding:20px 20px 20px 20px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t17" style="width:82px;padding:20px 20px 20px 20px;">
        <!--<![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
        <table class="t16" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="82" class="t15">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t15" style="width:82px;">
        <!--<![endif]-->
        <p class="t14" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:35px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#FF7A49;text-align:center;mso-line-height-rule:exactly;mso-text-raise:-4px;">${otp}</p></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t58" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="738" class="t57" style="padding:36px 50px 36px 60px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t57" style="width:628px;padding:36px 50px 36px 60px;">
        <!--<![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
        <table class="t49" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="189" class="t48" style="padding:10px 0 20px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t48" style="width:189px;padding:10px 0 20px 0;">
        <!--<![endif]-->
        <table class="t47" role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top">
        <tr class="t46"><td></td><td class="t27" width="44" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t26" style="width:100%;"><tr>
        <td class="t23" style="width:10px;" width="10"></td><td class="t24"><a href="https://www.twitter.com" style="font-size:0px;" target="_blank"><img class="t22" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://b8d47ca6-4c3e-4841-aa7f-900bb0bacc9e.b-cdn.net/e/a5b6d418-bd86-4c26-a3ea-c6d28e71d5bf/c5257813-aa0f-4192-ba62-b992a168cdca.png"/></a></td><td class="t25" style="width:10px;" width="10"></td>
        </tr></table>
        </td><td class="t33" width="44" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t32" style="width:100%;"><tr>
        <td class="t29" style="width:10px;" width="10"></td><td class="t30"><a href="https://www.facebook.com" style="font-size:0px;" target="_blank"><img class="t28" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://b8d47ca6-4c3e-4841-aa7f-900bb0bacc9e.b-cdn.net/e/a5b6d418-bd86-4c26-a3ea-c6d28e71d5bf/ae239ea6-4966-4be4-9639-31b03c826bca.png"/></a></td><td class="t31" style="width:10px;" width="10"></td>
        </tr></table>
        </td><td class="t39" width="44" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t38" style="width:100%;"><tr>
        <td class="t35" style="width:10px;" width="10"></td><td class="t36"><a href="https://www.youtube.com" style="font-size:0px;" target="_blank"><img class="t34" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://b8d47ca6-4c3e-4841-aa7f-900bb0bacc9e.b-cdn.net/e/a5b6d418-bd86-4c26-a3ea-c6d28e71d5bf/d253a730-7a38-4869-8661-d39de5854d55.png"/></a></td><td class="t37" style="width:10px;" width="10"></td>
        </tr></table>
        </td><td class="t45" width="44" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t44" style="width:100%;"><tr>
        <td class="t41" style="width:10px;" width="10"></td><td class="t42"><a href="https://www.instagram.com" style="font-size:0px;" target="_blank"><img class="t40" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://b8d47ca6-4c3e-4841-aa7f-900bb0bacc9e.b-cdn.net/e/a5b6d418-bd86-4c26-a3ea-c6d28e71d5bf/22eb8ea4-26b4-4d5f-aa33-94a84e140035.png"/></a></td><td class="t43" style="width:10px;" width="10"></td>
        </tr></table>
        </td>
        <td></td></tr>
        </table></td>
        </tr></table>
        </td></tr><tr><td align="left">
        <table class="t52" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="337" class="t51">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t51" style="width:337px;">
        <!--<![endif]-->
        <p class="t50" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">4019 Waterview Lane, Santa Fe, NM, New Mexico 87500</p></td>
        </tr></table>
        </td></tr><tr><td align="left">
        <table class="t56" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="230" class="t55">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t55" style="width:230px;">
        <!--<![endif]-->
        <p class="t54" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;"><a class="t53" href="https://tabular.email" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#888888;mso-line-height-rule:exactly;" target="_blank">© QUICKA LTD. All Rights Reserved</a></p></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr></table></td></tr></table></div><div class="gmail-mobile-forced-width" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div></body>
        </html>
    
    `;
};
