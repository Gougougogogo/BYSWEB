﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class BYSDNEntities : DbContext
    {
        public BYSDNEntities()
            : base("name=BYSDNEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Table_Answer> Table_Answer { get; set; }
        public virtual DbSet<Table_Attachments> Table_Attachments { get; set; }
        public virtual DbSet<Table_LogEntity> Table_LogEntity { get; set; }
        public virtual DbSet<Table_OperationLog> Table_OperationLog { get; set; }
        public virtual DbSet<Table_OperationType> Table_OperationType { get; set; }
        public virtual DbSet<Table_Question> Table_Question { get; set; }
        public virtual DbSet<Table_User> Table_User { get; set; }
        public virtual DbSet<Table_Blog> Table_Blog { get; set; }
        public virtual DbSet<Table_BlogItem> Table_BlogItem { get; set; }
        public virtual DbSet<Table_BlogAttachments> Table_BlogAttachments { get; set; }
        public virtual DbSet<Table_BlogReply> Table_BlogReply { get; set; }
        public virtual DbSet<Table_SubBlogReply> Table_SubBlogReply { get; set; }
    }
}
