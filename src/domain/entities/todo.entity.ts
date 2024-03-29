


export class TodoEntity{

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date|null
    ){}

    
    get isCompleted()
    {
        return !!this.completedAt;
    }


public static fromObject( object: {[key: string]: any}): TodoEntity
{
    const {id, text, completedAt} = object;
    if( !id ) throw 'Id is required';
    if( !text ) throw 'text is required';

    let newcompletedAt;
    if(completedAt){
        newcompletedAt = new Date(completedAt);
        if ( isNaN(newcompletedAt.getTime()) )
        {
            throw 'CompletedAt is not a valid date';
        }
    }

    return new TodoEntity(id, text, completedAt);
}

}

