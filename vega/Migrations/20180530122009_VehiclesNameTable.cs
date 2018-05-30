using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace vega.Migrations
{
    public partial class VehiclesNameTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vahicles_Models_ModelId",
                table: "Vahicles");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vahicles_VehicleId",
                table: "VehicleFeatures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vahicles",
                table: "Vahicles");

            migrationBuilder.RenameTable(
                name: "Vahicles",
                newName: "Vehicles");

            migrationBuilder.RenameIndex(
                name: "IX_Vahicles_ModelId",
                table: "Vehicles",
                newName: "IX_Vehicles_ModelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Models_ModelId",
                table: "Vehicles",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Models_ModelId",
                table: "Vehicles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles");

            migrationBuilder.RenameTable(
                name: "Vehicles",
                newName: "Vahicles");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_ModelId",
                table: "Vahicles",
                newName: "IX_Vahicles_ModelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vahicles",
                table: "Vahicles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Vahicles_Models_ModelId",
                table: "Vahicles",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vahicles_VehicleId",
                table: "VehicleFeatures",
                column: "VehicleId",
                principalTable: "Vahicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
