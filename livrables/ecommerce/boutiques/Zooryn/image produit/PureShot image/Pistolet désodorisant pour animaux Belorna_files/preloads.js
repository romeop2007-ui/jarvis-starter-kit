
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.Db3KX98s.js","/cdn/shopifycloud/checkout-web/assets/c1/app.pC2QZIzv.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor.BgMbUV1p.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser.CXP_dDmb.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-policy.DH6_Axi-.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-installmentsNotSupportedForAddress.CZ6eRFry.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-mapper-load-recovery.BoYC4d6N.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-eager-mappers.CnMijc_s.js","/cdn/shopifycloud/checkout-web/assets/c1/consent-manager-shared.Nd7Ww1fi.js","/cdn/shopifycloud/checkout-web/assets/c1/sections-shared.Dt2ItJ1I.js","/cdn/shopifycloud/checkout-web/assets/c1/error-logger-report-graphql-error.ihqnXMaa.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-normalizeBuyerDetails.BEhxIoxr.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-derivations.D-G5-STJ.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shopCashMoney.B1WgvElc.js","/cdn/shopifycloud/checkout-web/assets/c1/color-contrast-colorContrast.tkeO-3T8.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-redeemable.CNIdI_XL.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate.DIADhEPP.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayExternalAppContext.C-Z2oMxB.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-it.DTDcni4J.js","/cdn/shopifycloud/checkout-web/assets/c1/OnePage.jkBhwRvF.js","/cdn/shopifycloud/checkout-web/assets/c1/components-DeliveryTransition.CKpUdZIs.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.d59KQDKL.js","/cdn/shopifycloud/checkout-web/assets/c1/cross-border-hooks.CwIqdnAz.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePickupPoints.DtA5CojJ.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink.C8Hzmi2y.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressForm.DRiiCk5O.js","/cdn/shopifycloud/checkout-web/assets/c1/PhoneField.CMkAJrp6.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSuppressShopPayModalOnLoad.C8EQbvEZ.js","/cdn/shopifycloud/checkout-web/assets/c1/components-RedirectionNotice.module.COqArpwC.js","/cdn/shopifycloud/checkout-web/assets/c1/Popover.DdPqkIWt.js","/cdn/shopifycloud/checkout-web/assets/c1/Choice.DQmULULI.js","/cdn/shopifycloud/checkout-web/assets/c1/Checkbox.CxmUiY0J.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useCanChangeCompanyLocation.DTXNbc10.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl.rtnULKFr.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture.CDiuqmOw.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-previous.DXThPzJT.js","/cdn/shopifycloud/checkout-web/assets/c1/CaptureEvents-ButtonWithRegisterWebPixel.ZgCjzgX4.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo.CavihgBM.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsTimeout.DizBNwLR.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePostPurchase.36xwWX7D.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsMonorailTrack.Z7BQB2cc.js","/cdn/shopifycloud/checkout-web/assets/c1/EmptyState.dnKg9RDa.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks.BQj4bnpi.js","/cdn/shopifycloud/checkout-web/assets/c1/PendingShipping.8_gSpXGs.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeSection.Dd06HXGI.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentIcon.CRHEbx0J.js","/cdn/shopifycloud/checkout-web/assets/c1/cvv-cvvBridge.BBPzzipL.js","/cdn/shopifycloud/checkout-web/assets/c1/payment-usePaymentExemptionReason.lSdwCnDj.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage.mbIzLmRe.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentLine.hWQTKfQW.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress.DFVzZ8fu.js","/cdn/shopifycloud/checkout-web/assets/c1/Section.BUJWuaE5.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-SectionStyleOverride.DeCAqGg2.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner.Bf_BYB20.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit.PMS1oT9n.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons.B5g3gxPL.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButton-sizing._n8GkcX3.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPaySessionTokenStorage.CRgezX78.js","/cdn/shopifycloud/checkout-web/assets/c1/sandbox-helpers.BFBp0vwY.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-useViolationsHandler.BciB8DPC.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-as-guest-amazon-pay.BeQwAiLG.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-payment-button.D1UU_RzK.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShouldRevealExtension.CnBl02PM.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePreselectSpi.P-8PTi-1.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch.CBsiWZKm.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useAvailableShopPromotionDiscounts.BeMpVCqe.js","/cdn/shopifycloud/checkout-web/assets/c1/Middot.CKtziuzI.js","/cdn/shopifycloud/checkout-web/assets/c1/EstimatedDeliveryContent.ByGP3rjX.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-consolidated-included.CRwTgyqa.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingLines.BydJ5gsC.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.Dxl3GInG.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.tbb596jn.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector.BdPxG7Gm.js","/cdn/shopifycloud/checkout-web/assets/c1/TextArea.CsaOnUIw.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown.FS_p2VTS.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayNewSignupLoginExperiment.DXcNAs1N.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary.vrBK5OLe.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useStableHostMethodsReferences.D0McV_w0.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressSelector.B8I4Scnu.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList.DF8lwJwP.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.CM6PQxCl.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/checkout-policy.Dy6nOzcc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/stopwatch.CA9UAEYG.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.DkWpx8b4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DeliveryTransition.CxmS455s.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RememberMeSection.DQeXjG1A.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Section.CU18S7Ap.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentLine.D3bcP-mr.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useOnePageFormSubmit.tSP6pJcp.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentIcon.gzvCNwz_.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/cvvBridge.CIy8uDiZ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Choice.DNWz77j7.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/sizing.ZgfJ23-d.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/BillingAddressForm.BdwN7V1K.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Switch.Dq_6Ius6.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EmptyState.BEvzDDvy.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.CpHF4L7Q.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PhoneField.uZEuHncj.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Middot.D7Ujmshx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShippingLines.LcqrKXE1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MerchandiseModal.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RedirectionNotice.B8v_QGNW.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EstimatedDeliveryContent.B_THySFF.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.2B5x30PG.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentButtons.BbF1yV61.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0767/3302/2360/files/Capture_d_ecran_2026-04-25_a_14.29.44_x320.png?v=1777098596"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  