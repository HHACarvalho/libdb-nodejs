import IEmployeeDTO from '../../dtos/IEmployeeDTO';
import { Result } from '../../core/infrastructure/Result';

export default interface IEmployeeService {
	createEmployee(dto: IEmployeeDTO): Promise<Result<IEmployeeDTO>>;

	getAllEmployees(): Promise<Result<IEmployeeDTO[]>>;

	getEmployee(email: string): Promise<Result<IEmployeeDTO>>;

	updateEmployee(dto: IEmployeeDTO): Promise<Result<IEmployeeDTO>>;

	deleteEmployee(email: string): Promise<Result<IEmployeeDTO>>;
}
