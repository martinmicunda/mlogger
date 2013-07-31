package mlogger

import org.bson.types.ObjectId

class Source {

    ObjectId id
    String name
    String host


    static belongsTo = [project: Project]

    static constraints = {
    }
}
