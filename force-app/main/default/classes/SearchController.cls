public with sharing class SearchController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpps() {
        return [
            SELECT Id, Name, Description, CloseDate, StageName, AccountId, Account.Name
            FROM Opportunity
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> searchOpps(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, Name, Description, CloseDate, StageName, AccountId, Account.Name
            FROM Opportunity
            WHERE Name LIKE :key
            WITH SECURITY_ENFORCED
        ];
    }
}
