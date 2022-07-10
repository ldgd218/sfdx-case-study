import { LightningElement, wire } from 'lwc';
import searchOpps from '@salesforce/apex/SearchController.searchOpps';
import getOpps from '@salesforce/apex/SearchController.getOpps';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const DELAY = 1000;

const COLS = [
    { label: 'Opportunity Name', fieldName: 'Name', editable: true },
    { label: 'Description', fieldName: 'Description', editable: true },
    { label: 'Close Date', fieldName: 'CloseDate', editable: true },
    { label: 'Stage', fieldName: 'StageName', editable: true },
    { label: 'Account Name', fieldName: 'AccountId', editable: true },
];

export default class SearchComponent extends LightningElement {

    columns = COLS;
    oppsData = [];
    error;

    handleSearch(event) {
        let evtValue = event.target.value;
        clearTimeout(this.time);
        this.time = setTimeout(() => {
            this.valueToSearch = evtValue;
            if(this.valueToSearch.length == 0 && this.valueToSearch != null) {
                this.oppsData = [];
                //this.oppsData = this.parentData;
                this.error = null;
            }
            if(this.valueToSearch){

                searchOpps({ searchKey: this.valueToSearch })
                    .then((result) => {
                        
                        let tempData = JSON.parse(JSON.stringify(result));
                        this.oppsData = tempData;
                        this.error = null;
                    })
                    .catch((error) => {
                        
                        this.oppsData = undefined;
                        console.dir(error);
                        this.error = error.body.message;
                    })
            }
        }, DELAY)
    }
}
