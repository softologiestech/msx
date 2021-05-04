import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataWsService {
  websocket;
  isAuthenticate: boolean = false;

  constructor() {}

  public testwebsocket() {
    this.websocket = new WebSocket(environment.wsUri);
    this.websocket.onopen = (evt) => {
      this.onOpen(evt);
    };
    this.websocket.onclose = (evt) => {
      this.onClose(evt);
    };
    this.websocket.onmessage = (evt) => {
      this.onMessage(evt);
    };
    this.websocket.onerror = (evt) => {
      this.onError(evt);
    };
  }

  onOpen(evt) {
    console.log('CONNECTED');
    console.log('Endpoint :' + environment.wsUri);
    this.Authenticate();
  }

  onClose(evt) {
    console.log('DISCONNECTED. Reason :' + evt.reason);
    console.log('DISCONNECTED. Reason :' + evt.code);
    console.log('Endpoint :' + environment.wsUri);
  }

  onMessage(evt) {
    var event = JSON.parse(evt.data);

    if (event.MessageType == 'AuthenticateResult')
      if (event.Complete) {
        this.isAuthenticate = true;
        console.log(
          'Time : ' + new Date(Date.now()) + 'RESPONSE: AUTHENTICATED!!!'
        );
        setTimeout(() => this.doTest(), 500);
      }
  }

  onError(evt) {
    console.log('Time : ' + new Date(Date.now()) + '');
    console.log('ERROR data: ' + evt.data);
    console.log('ERROR message: ' + evt.message);
    console.log('ERROR reason: ' + evt.reason);
    console.log('Endpoint :' + environment.wsUri);
  }

  doSend(message) {
    var jsonmessage = JSON.stringify(message);
    this.websocket.send(jsonmessage);
    console.log('Time : ' + new Date(Date.now()) + 'SENT: ' + jsonmessage);
  }

  doClose() {
    this.websocket.close();
  }

  Authenticate() {
    console.log('Authenticate');

    var message = {
      MessageType: 'Authenticate',
      Password: environment.password,
    };

    this.doSend(message);
  }

  //GFDL TODO : All the functions supported by API are listed below. You can uncomment any function to see the flow of request and response
  doTest() {
    this.SubscribeRealtime(); //GFDL : Subscribes to realtime data (server will push new data whenever available)
    this.SubscribeSnapshot(); //GFDL : Subscribes to minute snapshot data (server will push new data whenever available)

    //GetLastQuote();						//GFDL : Returns LastTradePrice of Single Symbol (detailed)
    //GetLastQuoteShort();					//GFDL : Returns LastTradePrice of Single Symbol (short)
    //GetLastQuoteShortWithClose();			//GFDL : Returns LastTradePrice of Single Symbol (short) with Close of Previous Day
    //GetLastQuoteArray();					//GFDL : Returns LastTradePrice of multiple Symbols – max 25 in single call (detailed)
    //GetLastQuoteArrayShort();				//GFDL : Returns LastTradePrice of multiple Symbols – max 25 in single call (short)
    //GetLastQuoteArrayShortWithClose();	//GFDL : Returns LastTradePrice of multiple Symbols – max 25 in single call (short) with Previous Close

    //GetSnapshot();						//GFDL : Returns latest Snapshot Data of multiple Symbols – max 25 in single call
    //GetHistory();							//GFDL : Returns historical data (Tick / Minute / EOD)

    //GetExchanges();						//GFDL : Returns array of available exchanges configured for API Key

    //GetInstrumentsOnSearch();				//GFDL : Returns array of max. 20 instruments by selected exchange and 'search string'
    //GetInstruments();						//GFDL : Returns array of instruments by selected exchange

    //GetInstrumentTypes();					//GFDL : Returns list of Instrument Types (e.g. FUTIDX, FUTSTK, etc.)
    //GetProducts();						//GFDL : Returns list of Products (e.g. NIFTY, BANKNIFTY, GAIL, etc.)
    //GetExpiryDates();						//GFDL : Returns array of Expiry Dates (e.g. 25JUN2020, 30JUL2020, etc.)
    //GetOptionTypes();						//GFDL : Returns list of Option Types (e.g. CE, PE, etc.)
    //GetStrikePrices();					//GFDL : Returns list of Strike Prices (e.g. 10000, 11000, 75.5, etc.)

    //GetServerInfo();						//GFDL : Returns the server endpoint where user is connected
    //GetLimitation();						//GFDL : Returns user account information (functions allowed, Exchanges allowed, symbol limit, etc.)

    //GetMarketMessages();					//GFDL : Returns array of last messages (Market Messages) related to selected exchange
    //GetExchangeMessages();				//GFDL : Returns array of last messages (Exchange Messages) related to selected exchange

    //GetLastQuoteOptionChain();			//GFDL : Returns OptionChain data in realtime
    //GetExchangeSnapshot();				//GFDL : Returns entire Exchange Snapshot in realtime
  }

  SubscribeRealtime() {
    //Below request will subscribe to realtime data of Current Month Futures of NIFTY
    //This example shows how to request data using Continuous Format
    //Similarly, you can send NIFTY-II (Near month), NIFTY-III (Far month).
    //Below Symbol is Continuous Format of NIFTY Futures. It will never expire. So no change in code will be necessary.
    //You can use same naming convention for Futures of Instruments from NFO, CDS, MCX Exchanges
    //CDS Examples : USDINR-I, USDINR-II, USDINR-III
    //MCX Examples : NATURALGAS-I, NATURALGAS-II, NATURALGAS-III

    // Please see symbol naming conventions here :
    // https://globaldatafeeds.in/global-datafeeds-apis/global-datafeeds-apis/documentation-support/symbol-naming-convention/

    var request1 = {
      MessageType: 'SubscribeRealtime',
      Exchange: 'MCX', //GFDL : Supported values : NSE (stocks), NSE_IDX (Indices), NFO (F&O), MCX & CDS (Currency)
      InstrumentIdentifier: 'NATURALGAS-I', //GFDL : NIFTY-I always represents current month Futures.
    };
    this.doSend(request1);

    //Below request will subscribe to realtime data of NIFTY Futures Contract Expiring on 30JUL2020
    //This example shows how to request data using Long Format
    //Similarly, you can send FUTIDX_NIFTY_27AUG2020_XX_0 (near month), FUTIDX_NIFTY_24SEP2020_XX_0 (far month).
    //You can use same naming convention for Futures of Instruments from NFO, CDS, MCX Exchanges
    //NFO Options Examples : OPTIDX_NIFTY_02JUL2020_CE_10000, OPTSTK_RELIANCE_30JUL2020_CE_1700
    //CDS Futures Examples : FUTCUR_USDINR_26JUN2020_XX_0, FUTCUR_USDINR_29JUL2020_XX_0, FUTCUR_USDINR_27AUG2020_XX_0
    //CDS Options Examples : OPTCUR_USDINR_29JUL2020_CE_75.5, OPTCUR_EURINR_29JUL2020_CE_80
    //MCX Futures Examples : FUTCOM_CRUDEOIL_20JUL2020__0, FUTCOM_CRUDEOIL_19AUG2020__0, FUTCOM_CRUDEOIL_21SEP2020__0
    //MCX Options Examples : OPTFUT_CRUDEOIL_16JUL2020_PE_2050, OPTFUT_GOLD_27JUL2020_PE_43700

    //Replace it with appropriate expiry date if this contract is expired
    // Please see symbol naming conventions here :
    // https://globaldatafeeds.in/global-datafeeds-apis/global-datafeeds-apis/documentation-support/symbol-naming-convention/

    var request2 = {
      MessageType: 'SubscribeRealtime',
      Exchange: 'MCX', //GFDL : Supported Values : NFO, NSE, NSE_IDX, CDS, MCX. Mandatory Parameter
      InstrumentIdentifier: 'GOLD-I', //GFDL : This is long format symbol of Nifty Futures for Jul 2020 Futures
    };
    this.doSend(request2);

    //Below request will subscribe to realtime data of NIFTY Futures Contract Expiring on 30JUL2020
    //This example shows how to request data using Contractwise Format
    //Similarly, you can send NIFTY20AUGFUT (near month), NIFTY20SEPFUT (far month).
    //You can use same naming convention for Futures of Instruments from NFO, CDS, MCX Exchanges
    //NFO Options Examples : NIFTY02JUL2010000CE, RELIANCE30JUL201700CE
    //CDS Futures Examples : USDINR20JULFUT, USDINR20AUGFUT, USDINR20SEPFUT
    //CDS Options Examples : USDINR29JUL2075.5CE, EURINR29JUL2080CE
    //MCX Options Examples : CRUDEOIL20JULFUT, CRUDEOIL20AUGFUT, CRUDEOIL20SEPFUT
    //MCX Options Examples : CRUDEOIL20JUL2050PE, GOLD20JUL43700PE

    //Replace it with appropriate expiry date if this contract is expired
    // Please see symbol naming conventions here :
    // https://globaldatafeeds.in/global-datafeeds-apis/global-datafeeds-apis/documentation-support/symbol-naming-convention/

    var request3 = {
      MessageType: 'SubscribeRealtime',
      Exchange: 'MCX', //GFDL : Supported Values : NFO, NSE, NSE_IDX, CDS, MCX. Mandatory Parameter
      InstrumentIdentifier: 'NATURALGAS21MAYFUT', //GFDL : You can specify Contractwise Symbol like this for Futures of NFO, CDS, MCX
    };
    this.doSend(request3);

    //Below request will subscribe to realtime data of "NIFTY 50" Index
    //Other Index Examples are "NIFTY BANK", "NIFTY 100"
    var request4 = {
      MessageType: 'SubscribeRealtime',
      Exchange: 'MCX', //GFDL : Supported values : NSE (stocks), NSE_IDX (Indices), NFO (F&O), MCX & CDS (Currency)
      InstrumentIdentifier: 'SILVER-I', //GFDL : Please note, there is a the single white space between NIFTY & 50
    };
    this.doSend(request4);

    //Below request will subscribe to realtime data of "BAJAJ-AUTO" NSE Stock from EQ Series
    //Other Examples are RELIANCE, AXISBANK, LT, etc..
    //To subscribe to realtime data of any other series, append the series name to symbol name
    //for example, to request data of RELIANCE CAPITAL from BE Series, use RELCAPITAL.BE
    //EQ Series Symbols are mentioned without any suffix

    var request5 = {
      MessageType: 'SubscribeRealtime',
      Exchange: 'MCX', //GFDL : Supported Values : NFO, NSE, NSE_IDX, CDS, MCX. Mandatory Parameter
      InstrumentIdentifier: 'COPPER-I', //GFDL : Special Character should be mentioned "as they are" without any additional encoding
    };
    this.doSend(request5);

    var request6 = {
      MessageType: 'SubscribeRealtime',
      Exchange: 'MCX', //GFDL : Supported values : NSE (stocks), NSE_IDX (Indices), NFO (F&O), MCX & CDS (Currency)
      InstrumentIdentifier: 'LEAD-I', //GFDL : USDINR-I always represents current month Futures.
    };
    this.doSend(request6);

    var request7 = {
      MessageType: 'SubscribeRealtime',
      Exchange: 'MCX', //GFDL : Supported values : NSE (stocks), NSE_IDX (Indices), NFO (F&O), MCX & CDS (Currency)
      InstrumentIdentifier: 'GOLDM-I', //GFDL : NATURALGAS-I always represents current month Futures.
    };
    this.doSend(request7);
  }

  SubscribeSnapshot() {
    //Below request will subscribe to snapshot data of Current Month Futures of NIFTY
    //This example shows how to request data using Continuous Format
    //Similarly, you can send NIFTY-II (Near month), NIFTY-III (Far month).
    //Below Symbol is Continuous Format of NIFTY Futures. It will never expire. So no change in code will be necessary.
    //You can use same naming convention for Futures of Instruments from NFO, CDS, MCX Exchanges
    //CDS Examples : USDINR-I, USDINR-II, USDINR-III
    //MCX Examples : NATURALGAS-I, NATURALGAS-II, NATURALGAS-III

    // Please see symbol naming conventions here :
    // https://globaldatafeeds.in/global-datafeeds-apis/global-datafeeds-apis/documentation-support/symbol-naming-convention/

    var request1 = {
      MessageType: 'SubscribeSnapshot',
      Periodicity: 'Minute', //GFDL : Supported values are : Minute, Hour
      Period: 1, //GFDL : Supported values are : 1,2,5,10,15,30 (for Minute Periodicity ONLY)
      Exchange: 'NFO', //GFDL : Supported values : NSE (stocks), NSE_IDX (Indices), NFO (F&O), MCX & CDS (Currency)
      InstrumentIdentifier: 'NIFTY-I', //GFDL : NIFTY-I always represents current month Futures.
    };
    this.doSend(request1);

    //Below request will subscribe to snapshot data of NIFTY Futures Contract Expiring on 30JUL2020
    //This example shows how to request data using Long Format
    //Similarly, you can send FUTIDX_NIFTY_27AUG2020_XX_0 (near month), FUTIDX_NIFTY_24SEP2020_XX_0 (far month).
    //You can use same naming convention for Futures of Instruments from NFO, CDS, MCX Exchanges
    //NFO Options Examples : OPTIDX_NIFTY_02JUL2020_CE_10000, OPTSTK_RELIANCE_30JUL2020_CE_1700
    //CDS Futures Examples : FUTCUR_USDINR_26JUN2020_XX_0, FUTCUR_USDINR_29JUL2020_XX_0, FUTCUR_USDINR_27AUG2020_XX_0
    //CDS Options Examples : OPTCUR_USDINR_29JUL2020_CE_75.5, OPTCUR_EURINR_29JUL2020_CE_80
    //MCX Futures Examples : FUTCOM_CRUDEOIL_20JUL2020__0, FUTCOM_CRUDEOIL_19AUG2020__0, FUTCOM_CRUDEOIL_21SEP2020__0
    //MCX Options Examples : OPTFUT_CRUDEOIL_16JUL2020_PE_2050, OPTFUT_GOLD_27JUL2020_PE_43700

    //Replace it with appropriate expiry date if this contract is expired
    // Please see symbol naming conventions here :
    // https://globaldatafeeds.in/global-datafeeds-apis/global-datafeeds-apis/documentation-support/symbol-naming-convention/

    var request2 = {
      MessageType: 'SubscribeSnapshot',
      Periodicity: 'Minute', //GFDL : Supported values are : Minute, Hour
      Period: 1, //GFDL : Supported values are : 1,2,5,10,15,30 (for Minute Periodicity ONLY)
      Exchange: 'NFO', //GFDL : Supported Values : NFO, NSE, NSE_IDX, CDS, MCX. Mandatory Parameter
      InstrumentIdentifier: 'FUTIDX_NIFTY_30JUL2020_XX_0', //GFDL : This is long format symbol of Nifty Futures for Jul 2020 Futures
    };
    this.doSend(request2);

    //Below request will subscribe to snapshot data of NIFTY Futures Contract Expiring on 30JUL2020
    //This example shows how to request data using Contractwise Format
    //Similarly, you can send NIFTY20AUGFUT (near month), NIFTY20SEPFUT (far month).
    //You can use same naming convention for Futures of Instruments from NFO, CDS, MCX Exchanges
    //NFO Options Examples : NIFTY02JUL2010000CE, RELIANCE30JUL201700CE
    //CDS Futures Examples : USDINR20JULFUT, USDINR20AUGFUT, USDINR20SEPFUT
    //CDS Options Examples : USDINR29JUL2075.5CE, EURINR29JUL2080CE
    //MCX Options Examples : CRUDEOIL20JULFUT, CRUDEOIL20AUGFUT, CRUDEOIL20SEPFUT
    //MCX Options Examples : CRUDEOIL20JUL2050PE, GOLD20JUL43700PE

    //Replace it with appropriate expiry date if this contract is expired
    // Please see symbol naming conventions here :
    // https://globaldatafeeds.in/global-datafeeds-apis/global-datafeeds-apis/documentation-support/symbol-naming-convention/

    var request3 = {
      MessageType: 'SubscribeSnapshot',
      Periodicity: 'Minute', //GFDL : Supported values are : Minute, Hour
      Period: 1, //GFDL : Supported values are : 1,2,5,10,15,30 (for Minute Periodicity ONLY)
      Exchange: 'NFO',
      InstrumentIdentifier: 'NIFTY20JULFUT', //GFDL : You can specify Contractwise Symbol like this for Futures of NFO, CDS, MCX
    };
    this.doSend(request3);

    //Below request will subscribe to snapshot data of "NIFTY 50" Index
    //Other Index Examples are "NIFTY BANK", "NIFTY 100"
    var request4 = {
      MessageType: 'SubscribeSnapshot',
      Periodicity: 'Minute', //GFDL : Supported values are : Minute, Hour
      Period: 1, //GFDL : Supported values are : 1,2,5,10,15,30 (for Minute Periodicity ONLY)
      Exchange: 'NSE_IDX', //GFDL : Supported values : NSE (stocks), NSE_IDX (Indices), NFO (F&O), MCX & CDS (Currency)
      InstrumentIdentifier: 'NIFTY 50', //GFDL : Please note, there is a the single white space between NIFTY & 50
    };
    this.doSend(request4);

    //Below request will subscribe to snapshot data of "BAJAJ-AUTO" NSE Stock from EQ Series
    //Other Examples are RELIANCE, AXISBANK, LT, etc..
    //To subscribe to realtime data of any other series, append the series name to symbol name
    //for example, to request data of RELIANCE CAPITAL from BE Series, use RELCAPITAL.BE
    //EQ Series Symbols are mentioned without any suffix

    var request5 = {
      MessageType: 'SubscribeSnapshot',
      Periodicity: 'Minute', //GFDL : Supported values are : Minute, Hour
      Period: 1, //GFDL : Supported values are : 1,2,5,10,15,30 (for Minute Periodicity ONLY)
      Exchange: 'NSE', //GFDL : Supported Values : NFO, NSE, NSE_IDX, CDS, MCX. Mandatory Parameter
      InstrumentIdentifier: 'BAJAJ-AUTO', //GFDL : Special Character should be mentioned "as they are" without any additional encoding
    };
    this.doSend(request5);
  }
}
