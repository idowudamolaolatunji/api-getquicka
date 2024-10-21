module.exports = function (resetToken) {
    // const BASE_URL = "https://www.getquicka.com";
    const BASE_URL = "http://localhost:5173";

    return `
        <!--
        * This email was built using Tabular.
        * For more information, visit https://tabular.email
        -->
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
        .t25,.t27,.t30,.t6,.t66,.t69,.t73,.t75,.t9{width:440px!important}.t27{padding-left:20px!important;padding-right:20px!important}.t6{padding-bottom:20px!important}.t5{line-height:36px!important;font-size:34px!important;letter-spacing:-1.04px!important;mso-text-raise:1px!important}.t75{padding:26px 20px!important}.t62{text-align:left!important}.t33,.t35,.t39,.t41,.t45,.t47,.t51,.t53,.t57,.t59{width:8px!important;display:revert!important}.t37,.t43,.t49,.t55,.t61{vertical-align:top!important;width:40px!important}.t1,.t4{mso-line-height-alt:30px!important;line-height:30px!important}.t2{padding-bottom:0!important;width:186px!important}.t20{padding-bottom:16px!important;width:440px!important}.t15{font-size:18px!important;mso-text-raise:4px!important}.t16{line-height:24px!important;mso-text-raise:NaNpx!important}
        }
        </style>
        <style type="text/css">@media (max-width: 480px) {[class~="x_t27"]{padding-left:20px!important;padding-right:20px!important;width:440px!important;} [class~="x_t6"]{padding-bottom:20px!important;width:440px!important;} [class~="x_t5"]{line-height:36px!important;font-size:34px!important;letter-spacing:-1.04px!important;mso-text-raise:1px!important;} [class~="x_t75"]{padding-left:20px!important;padding-top:26px!important;padding-bottom:26px!important;padding-right:20px!important;width:440px!important;} [class~="x_t66"]{width:440px!important;} [class~="x_t62"]{text-align:left!important;} [class~="x_t33"]{width:8px!important;display:revert!important;} [class~="x_t35"]{width:8px!important;display:revert!important;} [class~="x_t37"]{vertical-align:top!important;width:40px!important;} [class~="x_t57"]{width:8px!important;display:revert!important;} [class~="x_t59"]{width:8px!important;display:revert!important;} [class~="x_t61"]{vertical-align:top!important;width:40px!important;} [class~="x_t51"]{width:8px!important;display:revert!important;} [class~="x_t53"]{width:8px!important;display:revert!important;} [class~="x_t55"]{vertical-align:top!important;width:40px!important;} [class~="x_t45"]{width:8px!important;display:revert!important;} [class~="x_t47"]{width:8px!important;display:revert!important;} [class~="x_t49"]{vertical-align:top!important;width:40px!important;} [class~="x_t39"]{width:8px!important;display:revert!important;} [class~="x_t41"]{width:8px!important;display:revert!important;} [class~="x_t43"]{vertical-align:top!important;width:40px!important;} [class~="x_t73"]{width:440px!important;} [class~="x_t9"]{width:440px!important;} [class~="x_t1"]{mso-line-height-alt:30px!important;line-height:30px!important;} [class~="x_t4"]{mso-line-height-alt:30px!important;line-height:30px!important;} [class~="x_t2"]{padding-bottom:0px!important;width:186px!important;} [class~="x_t25"]{width:440px!important;} [class~="x_t20"]{padding-bottom:16px!important;width:440px!important;} [class~="x_t15"]{font-size:18px!important;mso-text-raise:4px!important;} [class~="x_t16"]{line-height:24px!important;mso-text-raise:NaNpx!important;} [class~="x_t69"]{width:440px!important;} [class~="x_t30"]{width:440px!important;}}</style>
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
        <body id="body" class="t79" style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;"><div class="t78" style="background-color:#242424;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t77" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#242424;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#242424"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td align="center">
        <table class="t28" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="740" class="t27" style="background-color:#F8F8F8;padding:0 32px 30px 32px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t27" style="background-color:#F8F8F8;width:676px;padding:0 32px 30px 32px;">
        <!--<![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td><div class="t1" style="mso-line-height-rule:exactly;mso-line-height-alt:36px;line-height:36px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="left">
        <table class="t3" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="207" class="t2" style="padding:0 0 3px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t2" style="width:207px;padding:0 0 3px 0;">
        <!--<![endif]-->
        <div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="207" height="53.359375" alt="" src="https://da8e58d3-3ba6-4749-a536-fc3a8fd316e3.b-cdn.net/e/7c63fb9e-8360-4626-b89b-225706931ae3/d1db7301-6fab-4fb3-acec-5600ccbbc885.png"/></div></td>
        </tr></table>
        </td></tr><tr><td><div class="t4" style="mso-line-height-rule:exactly;mso-line-height-alt:36px;line-height:36px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t7" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="676" class="t6" style="padding:0 0 30px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t6" style="width:676px;padding:0 0 30px 0;">
        <!--<![endif]-->
        <h1 class="t5" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:42px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;">Forget password?</h1></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="676" class="t9" style="padding:0 0 20px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t9" style="width:676px;padding:0 0 20px 0;">
        <!--<![endif]-->
        <p class="t8" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:500;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">You&#39;re receiving this email because you requested a password reset for your Quicka account.&nbsp; <br/><br/>Click the button below to confirm it&#39;s you and reset your password</p></td>
        </tr></table>
        </td></tr><tr><td align="left">
        <table class="t13" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="260" class="t12" style="background-color:#181818;overflow:hidden;text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:8px;border-radius:44px 44px 44px 44px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t12" style="background-color:#181818;overflow:hidden;width:260px;text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:8px;border-radius:44px 44px 44px 44px;">
        <!--<![endif]-->
        <a class="t11" href="${BASE_URL}/reset-password/${resetToken}" style="display:block;margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:44px;font-weight:700;font-style:normal;font-size:18px;text-decoration:none;text-transform:capitalize;letter-spacing:2.4px;direction:ltr;color:#F8F8F8;text-align:center;mso-line-height-rule:exactly;mso-text-raise:8px;" target="_blank">Reset Password</a></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t21" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="676" class="t20" style="padding:26px 0 14px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t20" style="width:676px;padding:26px 0 14px 0;">
        <!--<![endif]-->
        <p class="t19" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;"><span class="t16" style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class="t14" style="margin:0;Margin:0;line-height:32px;font-weight:700;font-size:16px;mso-line-height-rule:exactly;mso-text-raise:5px;">N</span><span class="t15" style="margin:0;Margin:0;line-height:32px;font-weight:700;font-size:16px;mso-line-height-rule:exactly;mso-text-raise:5px;">eed Help?</span><br/></span><span class="t17" style="margin:0;Margin:0;font-size:16px;mso-line-height-rule:exactly;">Our dedicated support team is always here to assist you. Reach out to </span><span class="t18" style="margin:0;Margin:0;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;direction:ltr;color:#333333;mso-line-height-rule:exactly;">support@getquicka.com.</span></p></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t26" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="676" class="t25" style="padding:16px 0 16px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t25" style="width:676px;padding:16px 0 16px 0;">
        <!--<![endif]-->
        <p class="t24" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:500;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t22" style="margin:0;Margin:0;font-size:16px;mso-line-height-rule:exactly;">Best Regards,<br/>From </span><span class="t23" style="margin:0;Margin:0;font-weight:700;font-size:16px;mso-line-height-rule:exactly;">The Quicka Team.</span></p></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t76" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="742" class="t75" style="padding:30px 32px 30px 32px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t75" style="width:678px;padding:30px 32px 30px 32px;">
        <!--<![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
        <table class="t31" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="678" class="t30">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t30" style="width:678px;">
        <!--<![endif]-->
        <p class="t29" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">If you did not forget your password or didn&#39;t request a password reset, Please ignore or delete this email.</p></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t67" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="678" class="t66" style="padding:10px 0 20px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t66" style="width:678px;padding:10px 0 20px 0;">
        <!--<![endif]-->
        <div class="t65" style="width:100%;text-align:left;"><div class="t64" style="display:inline-block;"><table class="t63" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
        <tr class="t62"><td></td><td class="t37" width="44" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t36" style="width:100%;"><tr>
        <td class="t33" style="width:10px;" width="10"></td><td class="t34"><a href="https://www.twitter.com/" style="font-size:0px;" target="_blank"><img class="t32" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://da8e58d3-3ba6-4749-a536-fc3a8fd316e3.b-cdn.net/e/7c63fb9e-8360-4626-b89b-225706931ae3/a090ff63-e614-4aa7-bb2f-9aa0de55ff50.png"/></a></td><td class="t35" style="width:10px;" width="10"></td>
        </tr></table>
        </td><td class="t43" width="44" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t42" style="width:100%;"><tr>
        <td class="t39" style="width:10px;" width="10"></td><td class="t40"><a href="https://www.facebook.com/" style="font-size:0px;" target="_blank"><img class="t38" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://da8e58d3-3ba6-4749-a536-fc3a8fd316e3.b-cdn.net/e/7c63fb9e-8360-4626-b89b-225706931ae3/31985275-a7f2-43f0-bb1f-d18793008bb3.png"/></a></td><td class="t41" style="width:10px;" width="10"></td>
        </tr></table>
        </td><td class="t49" width="44" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t48" style="width:100%;"><tr>
        <td class="t45" style="width:10px;" width="10"></td><td class="t46"><a href="https://www.youtube.com/" style="font-size:0px;" target="_blank"><img class="t44" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://da8e58d3-3ba6-4749-a536-fc3a8fd316e3.b-cdn.net/e/7c63fb9e-8360-4626-b89b-225706931ae3/91e8bd04-99da-4e97-a4cf-7fce09962c60.png"/></a></td><td class="t47" style="width:10px;" width="10"></td>
        </tr></table>
        </td><td class="t55" width="44" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t54" style="width:100%;"><tr>
        <td class="t51" style="width:10px;" width="10"></td><td class="t52"><a href="https://www.linkedin.com/" style="font-size:0px;" target="_blank"><img class="t50" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://da8e58d3-3ba6-4749-a536-fc3a8fd316e3.b-cdn.net/e/7c63fb9e-8360-4626-b89b-225706931ae3/b17ba3a6-469f-4c12-adb4-a452ecf0b050.png"/></a></td><td class="t53" style="width:10px;" width="10"></td>
        </tr></table>
        </td><td class="t61" width="44" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t60" style="width:100%;"><tr>
        <td class="t57" style="width:10px;" width="10"></td><td class="t58"><a href="https://www.instagram.com/" style="font-size:0px;" target="_blank"><img class="t56" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://da8e58d3-3ba6-4749-a536-fc3a8fd316e3.b-cdn.net/e/7c63fb9e-8360-4626-b89b-225706931ae3/b09b34b0-5d28-47dd-94d0-90aa4f7a0e12.png"/></a></td><td class="t59" style="width:10px;" width="10"></td>
        </tr></table>
        </td>
        <td></td></tr>
        </table></div></div></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t70" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="678" class="t69">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t69" style="width:678px;">
        <!--<![endif]-->
        <p class="t68" style="margin:0;Margin:0;font-family:Raleway,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">4019 Waterview Lane, Santa Fe, NM, New Mexico 87500</p></td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t74" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="678" class="t73">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t73" style="width:678px;">
        <!--<![endif]-->
        <p class="t72" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;"><a class="t71" href="https://tabular.email" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#888888;mso-line-height-rule:exactly;" target="_blank">© QUICKA LTD. All Rights Reserved</a></p></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr></table></td></tr></table></div><div class="gmail-mobile-forced-width" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div></body>
        </html>
    `;
}