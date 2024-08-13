interface Repository<T> {
    /**
     * Get all records
     */
    all(): Promise<T[]>;
    /**
     * Get a single record based on id
     * @param id
     */
    get(id: any): Promise<T>;
    /**
     * Insert a new record
     * @param record
     */
    insert(record: T): Promise<T>;
}
