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
    
    public partial class Table_Answer
    {
        public System.Guid ID { get; set; }
        public System.Guid QuestionID { get; set; }
        public string Content { get; set; }
        public System.Guid Publisher { get; set; }
        public System.DateTime Date { get; set; }
    
        public virtual Table_Question Table_Question { get; set; }
        public virtual Table_User Table_User { get; set; }
    }
}
