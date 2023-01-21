import { Employee } from '../../domain/employee/employee';

export default interface IEmployeeRepo {
	exists(email: string): Promise<boolean>;

	save(employee: Employee): Promise<Employee>;

	findAll(): Promise<Employee[]>;

	find(email: string): Promise<Employee>;

	delete(email: string): Promise<Employee>;
}
