import config from '../../config';
import { Employee } from '../domain/employee/employee';
import { EmployeeMapper } from '../mappers/employeeMapper';
import { EmployeeEmail } from '../domain/employee/employeeEmail';
import { EmployeeName } from '../domain/employee/employeeName';
import { EmployeeRole } from '../domain/employee/employeeRole';
import { EmployeeSalary } from '../domain/employee/employeeSalary';
import IEmployeeDTO from '../dtos/IEmployeeDTO';
import IEmployeeService from './IServices/IEmployeeService';
import IEmployeeRepo from '../repos/IRepos/IEmployeeRepo';
import { Result } from '../core/infrastructure/Result';

import { Inject, Service } from 'typedi';

@Service()
export default class EmployeeService implements IEmployeeService {
	constructor(@Inject(config.repos.employee.name) private repoInstance: IEmployeeRepo) {}

	public async createEmployee(dto: IEmployeeDTO): Promise<Result<IEmployeeDTO>> {
		try {
			const exists = await this.repoInstance.exists(dto.email);

			if (exists) return Result.fail<IEmployeeDTO>('Employee with email=' + dto.email + ' already exists');

			const objOrError = await Employee.create({
				email: EmployeeEmail.create(dto.email).value,
				firstName: EmployeeName.create(dto.firstName).value,
				lastName: EmployeeName.create(dto.lastName).value,
				role: EmployeeRole.create(dto.role).value,
				salary: EmployeeSalary.create(dto.salary).value,
				hidden: false,
			});

			if (!objOrError.isSuccess) return Result.fail<IEmployeeDTO>(objOrError.error);

			const result = await this.repoInstance.save(objOrError.value);
			return Result.ok<IEmployeeDTO>(EmployeeMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async getAllEmployees(): Promise<Result<IEmployeeDTO[]>> {
		try {
			const list = await this.repoInstance.findAll();

			if (list == null) return Result.fail<IEmployeeDTO[]>('There are no employees');

			return Result.ok<IEmployeeDTO[]>(list.map((e) => EmployeeMapper.toDTO(e)));
		} catch (e) {
			throw e;
		}
	}

	public async getEmployee(email: string): Promise<Result<IEmployeeDTO>> {
		try {
			const obj = await this.repoInstance.find(email);

			if (obj == null) return Result.fail<IEmployeeDTO>('Employee not found');

			return Result.ok<IEmployeeDTO>(EmployeeMapper.toDTO(obj));
		} catch (e) {
			throw e;
		}
	}

	public async updateEmployee(dto: IEmployeeDTO): Promise<Result<IEmployeeDTO>> {
		try {
			const obj = await this.repoInstance.find(dto.email);

			if (obj == null) return Result.fail<IEmployeeDTO>('Employee not found');

			if (dto.email) obj.email = EmployeeEmail.create(dto.email).value;
			if (dto.firstName) obj.firstName = EmployeeName.create(dto.firstName).value;
			if (dto.lastName) obj.lastName = EmployeeName.create(dto.lastName).value;
			if (dto.role) obj.role = EmployeeRole.create(dto.role).value;
			if (dto.salary) obj.salary = EmployeeSalary.create(dto.salary).value;

			const result = await this.repoInstance.save(obj);
			return Result.ok<IEmployeeDTO>(EmployeeMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async deleteEmployee(email: string): Promise<Result<IEmployeeDTO>> {
		try {
			const exists = await this.repoInstance.exists(email);

			if (!exists) return Result.fail<IEmployeeDTO>('No employee with email=' + email);

			const result = await this.repoInstance.delete(email);
			return Result.ok<IEmployeeDTO>(EmployeeMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}
}
