import ElementSelectKey from './elementSelectKey.model';
import EleEventTypes from './eleEventTypes.model';
export default class EleOperatorModel {
    selector: ElementSelectKey;
    eventType: EleEventTypes;
    value: any;
    waitForNavigation: Boolean;
    waitForRequest: Boolean;
}
