//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BYS_Web.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class Table_OperationType
    {
        public Table_OperationType()
        {
            this.Table_LogEntity = new HashSet<Table_LogEntity>();
        }
    
        public System.Guid ID { get; set; }
        public string Type { get; set; }
    
        public virtual ICollection<Table_LogEntity> Table_LogEntity { get; set; }
    }
}
